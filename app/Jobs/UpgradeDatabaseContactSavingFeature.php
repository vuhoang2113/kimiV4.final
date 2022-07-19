<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Exception;
use Illuminate\Support\Facades\Log;

use App\Models\User;
use App\Models\Setting;

class UpgradeDatabaseContactSavingFeature extends MasterJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->batchName = 'Upgrade Database Contact Saving Feature Batch';
        $this->setChanelLog();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $this->logStart();
            $this->addUserSetting();
            $this->logEnd();
        } catch (\Exception $ex) {
            $this->log($ex->getMessage(), 'debug');
            parent::logEnd();
        }
    }

    private function addUserSetting()
    {
        try {
            User::chunk(100, function ($users) {
                foreach ($users as $user) {
                    Setting::firstOrCreate(['user_id' => $user->id], ['user_id' => $user->id, 'contact_saving_feature' => false]);
                }
            });
        } catch (Exception $ex) {
            $this->log($ex->getMessage(), 'debug');
        }
    }
}
