pipeline {
    agent any
    stages {
        stage('git pull') {
            steps {
                // 拉取git最新代码
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'chendie-dev', url: 'https://github.com/chendie-dev/my-blog']])
            }
        }
        stage('Node') { 
            steps {
               sh 'node -v' 
            }
        }
        stage('Install') { 
            steps {
               sh 'yarn install' 
            }
        }
        stage('Build') { 
            steps {
               sh 'yarn build'
            }
        }
        
    }
}

