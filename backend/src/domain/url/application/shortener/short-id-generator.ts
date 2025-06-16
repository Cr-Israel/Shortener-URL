export interface ShortIdGenerator {
  generate(): Promise<string>
}
