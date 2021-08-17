$ aws s3 mb s3://ndduc_test --region=us-west-1
$ aws s3 mb s3://ndductest --index-document index.html --error-document index.html
$ aws s3 sync dist/ani-hook s3://ndductest