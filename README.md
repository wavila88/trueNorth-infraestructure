# Welcome to your CDK TypeScript project for lite-thinking

In this project we're creating infraestructure for aws with following:

* Cluster.
* VPC and its subnets.
* 2 fargate instances.
* One load balancer with its target group this will contain our docker images

All of this in a few lines of code in the following [link](https://github.com/wavila88/lite-thinking-infraestructure/blob/develop/lib/cdk-infraestructure-stack.ts). 

This will take the docker image from ECR repo.
