// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      "relation": [
        "delegate_permission/common.handle_all_urls"
      ],
      "target": {
        "namespace": "android_app",
        "package_name": "com.factoryuniverse",
        "sha256_cert_fingerprints": [
          "DC:30:9B:4C:93:66:EF:44:F4:E4:AA:9C:FC:30:41:7B:BB:8C:74:97:0A:FA:11:66:A4:25:23:F6:BE:A9:A2:5B"
        ]
      }
    }
  ])
}
