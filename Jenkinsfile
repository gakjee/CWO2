pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'cw2-server'          // Name of the Docker image
        DOCKER_TAG = '1.0'                  // Image tag
        DOCKERHUB_USER = 'oliver1403'  
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
    	echo "Running tests inside container..."
    	script {
        	// Clean up any existing container with the same name
        	sh 'docker rm -f test_container || true'

        	// Run the container for testing
	        sh 'docker run -d --name test_container -p 8080:8080 ${DOCKER_IMAGE}:${DOCKER_TAG}'
        
	        // Optional: Verify the container is running
	        sh 'docker ps | grep test_container'
	    }
	}

        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing image to DockerHub...'
                script {
                    withDockerRegistry(credentialsId: 'dockerhub-credentials', url: '') {
                        dockerImage.push("${DOCKER_TAG}")
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

