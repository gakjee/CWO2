pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'cw2-server'     // Name of the Docker image
        DOCKER_TAG = '1.0'             // Image tag
        DOCKERHUB_USER = 'your_dockerhub_username'
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
                    dockerImage = docker.build("${DOCKERHUB_USER}/${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Test Docker Container') {
            steps {
                echo 'Running tests inside container...'
                sh """
                    docker run -d --name test_container -p 8080:8080 ${DOCKERHUB_USER}/${DOCKER_IMAGE}:${DOCKER_TAG}
                    sleep 10
                    curl -f http://localhost:8080 || exit 1
                    docker rm -f test_container
                """
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing image to DockerHub...'
                withDockerRegistry(credentialsId: 'dockerhub-credentials', url: '') {
                    dockerImage.push("${DOCKER_TAG}")
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
