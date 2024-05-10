describe("TypingTest", () => {
  let currentTest: TypingTest;

  beforeEach(() => {
    currentTest = new TypingTest("test-1", "stopwatch-1");
  });

  afterEach(() => {
    // Clean up any resources used by the test
  });

  it("should initialize the test", async () => {
    await currentTest.initializeTest();
    expect(currentTest.quoteData.chars.length).toBeGreaterThan(0);
    expect(currentTest.quoteData.originalChars.length).toBeGreaterThan(0);
    expect(currentTest.textBox.innerHTML).toBeTruthy();
  });

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

  it("should generate a quote", async () => {
    const quote = await currentTest.generateQuote();
    expect(quote).toBeTruthy();
  });
});