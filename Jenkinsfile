pipeline {
    agent any
    triggers {
        pollSCM('* * * * *')
    }
    environment {
        DB_PASSWORD = credentials('MEDICARE_DB_PASSWORD')
    }
    stages {
        stage('Build') {
            steps {
                git url: 'https://github.com/dthill/capstone.git', branch: 'main'
                sh "docker compose build"
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}