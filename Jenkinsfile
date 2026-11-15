pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.64.1-noble'
      label 'docker'
      args '--ipc=host'
    }
  }
  options {
    skipDefaultCheckout(true)
    disableConcurrentBuilds()
    timeout(time: 20, unit: 'MINUTES')
  }
  environment {
    CI = 'true'
    BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/'
    TEST_USERNAME = 'Admin'
    TEST_PASSWORD = 'admin123'
  }
  stages {
    stage('Checkout') { steps { deleteDir(); checkout scm } }
    stage('Test') {
      steps {
        sh 'npm ci'
        sh 'npm run typecheck'
        sh 'xvfb-run -a npx playwright test --project=chromium --project=firefox --project=webkit'
      }
    }
  }
  post {
    always {
      junit testResults: 'test-results/junit.xml', allowEmptyResults: true
      archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
    }
  }
}
