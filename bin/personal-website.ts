#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PersonalWebsiteStack } from '../lib/personal-website-stack';

const app = new cdk.App();
new PersonalWebsiteStack(app, 'PersonalWebsiteStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});