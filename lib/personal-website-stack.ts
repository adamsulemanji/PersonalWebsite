import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FrontendConstruct } from './cloudfront';

export class PersonalWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new FrontendConstruct(this, 'PersonalWebsite');
  }
}
