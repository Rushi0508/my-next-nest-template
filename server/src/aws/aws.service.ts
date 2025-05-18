import { Injectable } from '@nestjs/common'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import config from 'src/config'

@Injectable()
export class AwsService {
  private s3: S3Client
  private readonly bucketName: string

  constructor() {
    this.s3 = new S3Client({
      region: config().aws.s3.region,
      credentials: {
        accessKeyId: config().aws.s3.accessKeyId,
        secretAccessKey: config().aws.s3.secretAccessKey,
      },
    })
    this.bucketName = config().aws.s3.bucket
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })

    await this.s3.send(command)
    return `https://${this.bucketName}.s3.${config().aws.s3.region}.amazonaws.com/${key}`
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    })

    await this.s3.send(command)
  }
}
