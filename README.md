# Test-05

Pull requests run lint, unit tests, and a web server check. Pushes to `main`
build and publish a multi-platform container image to GitHub Container Registry
(GHCR), tagged with the branch name and commit SHA. For example, to pull and run
the latest image built from `main`:

```sh
docker pull ghcr.io/jbbby/test-05:main
docker run --rm -p 3000:3000 ghcr.io/jbbby/test-05:main
```

Same-repository pull requests also publish an image tagged with the commit SHA.
To test a pull request before merging, replace `<short-sha>` with the short
commit SHA shown in the PR:

```sh
podman pull ghcr.io/jbbby/test-05:sha-<short-sha>
podman run --rm -p 3000:3000 ghcr.io/jbbby/test-05:sha-<short-sha>
```

Images are not published for pull requests from forks.

Open [http://localhost:3000](http://localhost:3000) to see the Hello World
response.

Run lint and unit tests locally with:

```sh
npm run lint
npm test
```

Each push to `main` also creates the next patch Git tag (`X.Y.Z`) and publishes
the corresponding versioned container image with the same tag. If no version
tags exist yet, the first tag is `0.0.1`.

GHCR packages are private by default. To allow anyone to pull the image without
authenticating, change the package visibility to **Public** in the package's
settings on GitHub. If it remains private, users need to authenticate to GHCR
with a token that has `read:packages` permission before pulling.