import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";


const ENVIRONMENT_VARIABLES = {
  SESSION_TIME : '7m',
  SECRET_KEY:'9O8I7U6Y%',
  SQL_DATABASE: 'sql9619488',
  SQL_HOST: 'sql9.freesqldatabase.com',
  SQL_PASSWORD: 'Xkm3frQs7G',
  SQL_USER: 'sql9619488',
}

export class CdkInfraestructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "myVPC", {
      availabilityZones:['us-east-1a','us-east-1b'],
      vpcName: 'LiteVPC'

    });

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc,
      clusterName:'liteThinkVPC'
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 4, // Default is 1
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry("public.ecr.aws/p1g5b2e2/back-calculator"), environment:ENVIRONMENT_VARIABLES },
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: true // Default is true
      
    });
  }
}
