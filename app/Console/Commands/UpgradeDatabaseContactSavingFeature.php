<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\UpgradeDatabaseContactSavingFeature as UpgradeDatabaseContactSavingFeatureJob;

class UpgradeDatabaseContactSavingFeature extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'batch:upgrade_database_contact_saving_feature';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upgrade Database Contact Saving Feature';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        UpgradeDatabaseContactSavingFeatureJob::dispatch();
        return 0;
    }
}
