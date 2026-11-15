pipeline {
    agent {
        label 'playwright-windows'
    }

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timeout(time: 90, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    triggers {
        cron('TZ=Asia/Kolkata\n0 6 * * *')
    }

    environment {
        CI = 'true'
        BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/*,test-results/,reports/*',
                allowEmptyArchive: true
            )

            junit(
                testResults: 'reports/junit.xml',
                allowEmptyResults: false
            )
        }
    }
}