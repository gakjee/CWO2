pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "oliver1403/cw2-server"
        DOCKER_TAG = "1.0"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out code..."
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Test Docker Container') {
            steps {
                echo "Running tests inside container..."
                script {
                    // Clean up any existing container with the same name
                    sh 'docker rm -f test_container || true'

                    // Run container and perform simple checks
                    sh 'docker run -d --name test_container -p 8081:8080 ${DOCKER_IMAGE}:${DOCKER_TAG}'
                    
                    // Optionally, add tests here such as curl checks
                    sh 'sleep 5 && curl -f http://localhost:8080 || exit 1'

                    // Stop and clean up test container
                    sh 'docker rm -f test_container'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo "Pushing Docker image to DockerHub..."
                script {
                    docker.withRegistry('', 'dockerhub-credentials') {
                        dockerImage.push("${DOCKER_TAG}")
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs."
        }
    }
}

