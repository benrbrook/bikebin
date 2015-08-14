var assets = EJSON.parse(Assets.getText('settings.json'));

S3.config = {
    key: assets.AWSAccessKeyId,
    secret: assets.AWSSecretAccessKey,
    bucket: assets.S3Bucket,
    region: assets.S3Region
  };
