import { Either, left, right } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, string> {
    if (shouldSuccess) {
        return right("success")
    } else {
        return left("failure")
    }
}

describe("Either", () => {
    it("should return success", () => {
        const result = doSomething(true)
        expect(result.isRight()).toBeTruthy()
    })

    it("should return failure", () => {
        const result = doSomething(false)
        expect(result.isLeft()).toBeTruthy()
    })
})