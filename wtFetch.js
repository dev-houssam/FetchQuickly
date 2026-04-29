class WTFetchResponse {
  constructor(stream) {
    this.stream = stream;
  }

  async text() {
    const reader = this.stream.getReader();
    let chunks = [];

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    return new TextDecoder().decode(
      new Uint8Array(chunks.flat())
    );
  }

  async json() {
    return JSON.parse(await this.text());
  }
}

export class WTFetch {
  constructor(url) {
    this.url = url;
    this.transport = new WebTransport(url);
    this.ready = this.transport.ready;
  }

  async request(path, options = {}) {
    await this.ready;

    const stream = await this.transport.createBidirectionalStream();
    const writer = stream.writable.getWriter();

    const payload = JSON.stringify({
      path,
      method: options.method || "GET",
      body: options.body || null
    });

    await writer.write(new TextEncoder().encode(payload));
    await writer.close();

    return new WTFetchResponse(stream.readable);
  }
}

// helper
export async function wtFetch(url, options) {
  const client = new WTFetch("https://localhost:4433");
  return client.request(url, options);
}
