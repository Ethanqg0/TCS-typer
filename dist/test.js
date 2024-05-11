"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe("TypingTest", () => {
    let currentTest;
    beforeEach(() => {
        currentTest = new TypingTest("test-1", "stopwatch-1");
    });
    afterEach(() => {
        // Clean up any resources used by the test
    });
    it("should initialize the test", () => __awaiter(void 0, void 0, void 0, function* () {
        yield currentTest.initializeTest();
        expect(currentTest.quoteData.chars.length).toBeGreaterThan(0);
        expect(currentTest.quoteData.originalChars.length).toBeGreaterThan(0);
        expect(currentTest.textBox.innerHTML).toBeTruthy();
    }));
    it("should start the stopwatch", () => {
        currentTest.startStopwatch();
        expect(currentTest.stopwatch.isRunning).toBe(true);
        expect(currentTest.stopwatch.startTime).toBeGreaterThan(0);
        expect(currentTest.stopwatch.timer).not.toBeNull();
    });
    it("should update the time", () => {
        currentTest.startStopwatch();
        const initialElapsedTime = currentTest.stopwatch.elapsedTime;
        jest.advanceTimersByTime(1000); // Simulate 1 second elapsed
        currentTest.updateTime();
        expect(currentTest.stopwatch.elapsedTime).toBeGreaterThan(initialElapsedTime);
        expect(currentTest.stopwatchDisplay.textContent).toBeTruthy();
    });
    it("should reset the stopwatch", () => {
        currentTest.startStopwatch();
        currentTest.resetStopwatch();
        expect(currentTest.stopwatch.isRunning).toBe(false);
        expect(currentTest.stopwatch.elapsedTime).toBe(0);
        expect(currentTest.stopwatch.timer).toBeNull();
        expect(currentTest.stopwatchDisplay.textContent).toBe("00:00:00");
    });
    it("should generate a quote", () => __awaiter(void 0, void 0, void 0, function* () {
        const quote = yield currentTest.generateQuote();
        expect(quote).toBeTruthy();
    }));
});
