import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";


const ENVIRONMENT_VARIABLES = {
  NEXT_PUBLIC_SQL_USER : 'sa',
  NEXT_PUBLIC_SQL_PASSWORD:'1234',
  NEXT_PUBLIC_SQL_SERVER: 'local',
  NEXT_PUBLIC_SQL_DATABASE: 'LITE_THINKING'
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
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService2", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 4, // Default is 1
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry("public.ecr.aws/p1g5b2e2/think-lite"), environment:ENVIRONMENT_VARIABLES },
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: true // Default is true
      
    });
  }
}
