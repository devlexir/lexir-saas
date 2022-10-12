import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "lexir-admin@lexir-347206.iam.gserviceaccount.com",
    client_id: "112115875462007935930",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVyClQc4b7LmRA\ndXCHLsGxDU8i/RnP8C1GS4wLKlH0kU8BCUiypW66w0Yfiy0RgX1XxbSTZY8yySrx\nQckkiYxnrXaO0nGuGHDKhpXh0k9Af2S0/uyoWElyxgNGpORYzW3vc+HVYueVcMdZ\nBJfrL1R1/4enQ59uwRmzXBLLz1wBOA6Hiftgz0GJ+t3fFY4/V01t8FFH5r7ny37p\nHy1fbl3bdCrxk3XmgjR/dU2mPkPOKuZ2Ntc0I9wrngTH7Wj3VKLe1bNMUFfwTCPo\n7n1sv0JEyzd+7Ny0q/nDNs+YfqI2TB6tOiN0VqFbhoQdeIRDkGawqQmNXfqt7sdG\nK3LNmamFAgMBAAECggEAMWaM13yuyS3l+Dg7Ld3Z3+hHrHnoxFKHn8oW3UClChsm\n8sIatL+CSDGWK3Vdj4FI/eafjP0Hu3Bdlj0Btkn7sjyVHDlYkCaxL7esfG+9JRYb\nJzEObnNiW52SxbkWVEf6Wr5ARi9R/Qg/5JvpYC1Cevb2uanodm80WWxSIpsy80u8\n9rFK3G6F78ouF9ryK0BNVizTzZvH8W2ToA6phLdJh0RtZHnCkmP1NjK2oaljex6w\nHHHRso2cfLj9RJkuBRUPG3EKWrGnWkeDvZzY3yYlanIt1BhZ2JCA3N/QjcuCKMDT\nm/8elUaESoSloJrGkFMVDQVaqZF4ofXaJypczzaUUQKBgQDv08eR6PeZyHWuKa+z\nU2wO+AMPGQJXQgAmN/TiUB4D9r7GIFyapGQPWDKtWefbwhJoSG6PSX5wQ4lndhx5\nCw+qVJI6L/0JdI5RBOtJqHBjBRzRhMpZt/9LN3Y94Y1so+UzFZogcVbos34yIYiz\nmn2KnNDEfC/YnXQc5Vdu88lFkQKBgQDkMsBciF9SSJLZ4JzQcSDD31nHbk1kJAaA\nYFvVaMg6CWQnemV9aIpQEfvFcV6uzJrwHmRwS1DHGlDRk8Bi1jq3HwaRGzWpA7Hs\nR0sGF41T0WJztyqJswngGR9bIAvyt0hl5GqhqJTV5UowWWJiUB8uPyNIa27l0tJa\nijNiWy7atQKBgQCWxnwnXWGcywxBDHAru3yqBH5X1Y9FMHdLj85jIZ9dOplBkkLl\n7ggCJZ7moSlFXcOY0EDB0KCvD6ao5vaLmsqkeTrdXiIk+aQnh4Is8rqFZkdx6ZwV\nv7m+ngW2bcEt1fRYo3Ich2TuMzpZZf+9epkGtgQCI1kpRAQlzoGjfZzCIQKBgGuO\n6FA1DwjPoDgFwKQWzmTEX6K6gMvUlyPnRyG9s7J3PrfE3xVPMvIup8cWepRVaCoJ\niTnMphRSeQlvZNyxMRejDgtTEeXKEhDWQaxraXe6V3dHPEuPEfaIoNjor/kFHqC4\nGvJ7bTusSV2ko9THAwtfQxgdWzYEOpXmUfXoGJuJAoGAaKJYvO3jdtl4qtdIIE5c\nAFb0k27/WR3QLWwkNo9CjUvZGYOp6z7BCMLr+AwwAUWaqE3eFWABUPsfoFKFRu73\nb63QVh184uM6CrxeLHG4WKt1rSuVKIdiOAstFWUYAQA083+QO1WkhIk8shVWc5oZ\ne+EBDqAA+OHkbzagr9MGb4Q=\n-----END PRIVATE KEY-----\n".replace(
        /\\n/g,
        "\n"
      ),
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export const sheets = google.sheets({
  auth,
  version: "v4",
});
