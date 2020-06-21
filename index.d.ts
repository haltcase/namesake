interface NamesakeOptions {
  limit?: number
}

interface Namesake {
  (keyword?: string, options?: NamesakeOptions): Promise<string[]>
}

declare const namesake: Namesake

export = namesake
