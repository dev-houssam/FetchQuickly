# FetchQuickly
Fetch Quickly is a little librairy which allow to use fetch on Quic stack.

So, ....

# wt-fetch

A minimal fetch-like client built on top of WebTransport (QUIC).

## Overview

wt-fetch is a lightweight client that mimics the `fetch` API using WebTransport streams instead of HTTP.
It is designed for low-latency communication and custom protocols over QUIC.

## Requirements

* A browser that supports WebTransport
* A server that supports WebTransport over HTTP/3

## Installation

Copy the client code into your project or import it as a module.

## Usage

```js
import { wtFetch } from "./wt-fetch.js";

const res = await wtFetch("/api/data", {
  method: "POST",
  body: JSON.stringify({ hello: "world" })
});

const data = await res.json();
console.log(data);
```

## API

### wtFetch(path, options)

* `path`: string
* `options`:

  * `method`: HTTP-like method (default: GET)
  * `body`: request payload

Returns a `WTFetchResponse`.

### WTFetchResponse

* `text()`: returns response as string
* `json()`: parses response as JSON

## Protocol

The client sends JSON over a bidirectional stream:

```json
{
  "path": "/api/data",
  "method": "POST",
  "body": "..."
}
```

The server must respond with raw data (e.g. JSON string).

## Limitations

* No native HTTP semantics (no real headers, cookies, or status codes)
* No browser caching
* Requires custom server implementation
* WebTransport support is still evolving

## Use Cases

* Real-time applications
* Low-latency APIs
* Custom protocols over QUIC

## Notes

This library does not replace `fetch`. It provides a simplified abstraction over QUIC streams for experimental or specialized use cases.
