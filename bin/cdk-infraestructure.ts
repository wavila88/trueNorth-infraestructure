#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkInfraestructureStack } from '../lib/cdk-infraestructure-stack';

const app = new cdk.App();
new CdkInfraestructureStack(app, 'CdkInfraestructureStack', {
  description:'cdk to deploy infraestructure, this includes cluster, fargate instances, load balancer, creation vpc target group and its comunication with each fargate instance'
});