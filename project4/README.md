# Udagram project: From Monolithic to Microservices

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

## Tasks

### Setup Node Environment

#### For build the project run the build_script.sh, this will create docker images for
1. reverse-proxy
2. udacity-c2-frontend
3. udacity-c2-feed
4. udacity-c2-user
and push image to docker hub

#### For running the project on your local machinge node. Open a new terminal within the project directory and run:

1. docker-compose up 
2. Go to http://localhost:8100

### Running project on kubernete
1. go to the k8s folder 
2. Run kubectl create -f .

