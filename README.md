# Test-05

Each push to a branch builds and publishes a container image to GitHub Container
Registry (GHCR). The branch name and commit SHA are available as image tags. For
example, to pull and run the latest image built from `main`:

```sh
docker pull ghcr.io/jbbby/test-05:main
docker run --rm -p 3000:3000 ghcr.io/jbbby/test-05:main
```

Open [http://localhost:3000](http://localhost:3000) to see the Hello World
response.

GHCR packages are private by default. To allow anyone to pull the image without
authenticating, change the package visibility to **Public** in the package's
settings on GitHub. If it remains private, users need to authenticate to GHCR
with a token that has `read:packages` permission before pulling.