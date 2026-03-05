import { renderHook } from "@testing-library/react";
import useBmiCalculate from "./useBmiCalculate";
describe("when calculating bmi", () => {
  it("should calculate bmi correctly", () => {
    const { result } = renderHook(() => useBmiCalculate());
    expect(result.current.bmi).toBe("27.68"); // BMI for weight 80kg and height 170cm
  });
});
