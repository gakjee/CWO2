pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "oliver1403/cw2-server"
        DOCKER_TAG = "1.0"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    sh '''
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    '''
                }
            }
        }

        stage('Test Docker Container') {
            steps {
                echo 'Running tests inside container...'
                script {
                    sh '''
                        # Remove existing container if it exists
                        docker rm -f test_container || true
                        
                        # Run the container on a different port
                        docker run -d --name test_container -p 8081:8080 ${DOCKER_IMAGE}:${DOCKER_TAG}
                        
                        # Allow time for container to start
                        sleep 5
                        
                        # Test the application
                        curl -f http://localhost:8081
                    '''
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing Docker image to DockerHub...'
                script {
                    docker.withRegistry('', 'dockerhub-credentials') {
                        dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        dockerImage.push()
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}

