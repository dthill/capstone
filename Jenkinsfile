pipeline {
    agent any
    triggers {
        pollSCM('0 0 * * *')
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
        stage('e2e Test') {
            steps {
                sleep 40
                sh 'cd e2e-tests && ./mvnw test'
            }
        }
    }
}