import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BecomeMod from "../components/ModRequest/BecomeMod";
import { useAuth } from "../components/Context/AuthContext";
import axios from "axios";
import { backendApi } from "../backendApi";

// TODO: ezeket az axios hívásokat is ki kéne cserélni backendApi-val

//jest.mock("../src/components/Context/AuthContext");
//jest.mock("axios");

describe("BecomeMod Component", () => {
  const mockOnRequestSubmitted = jest.fn();
  const mockHandleCloseModal = jest.fn();
  const mockToken = "mockToken";
  const mockUser = { userId: 1 };

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      user: mockUser,
      token: mockToken,

    });
  });

  it("renders the form correctly", () => {
    render(<BecomeMod onRequestSubmitted={mockOnRequestSubmitted} handleCloseModal={mockHandleCloseModal} />);
    
    expect(screen.getByText("Become a Mod")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Why would you like to become a mod?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();

  });

  it("shows an error if the reason is not provided", async () => {
    render(<BecomeMod onRequestSubmitted={mockOnRequestSubmitted} handleCloseModal={mockHandleCloseModal} />);
    
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);
    
    await waitFor(() => expect(screen.getByText("The reason field is mandatory!")).toBeInTheDocument());

  });

  it("shows an error if the reason is too short", async () => {
    render(<BecomeMod onRequestSubmitted={mockOnRequestSubmitted} handleCloseModal={mockHandleCloseModal} />);
    
    const input = screen.getByPlaceholderText("Why would you like to become a mod?");
    fireEvent.change(input, { target: { value: "abc" } });
    const submitButton = screen.getByRole("button", { name: "Submit" });
    
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText("The reason must be at least 5 characters long")).toBeInTheDocument());

  });

  it("submits the form successfully", async () => {
    const mockResponse = { data: { message: "Success" } };
    axios.post.mockResolvedValue(mockResponse);
    
    render(<BecomeMod onRequestSubmitted={mockOnRequestSubmitted} handleCloseModal={mockHandleCloseModal} />);
    
    const input = screen.getByPlaceholderText("Why would you like to become a mod?");
    fireEvent.change(input, { target: { value: "I want to help manage the community!" } });
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);
    
    expect(submitButton).toHaveTextContent("Submitting...");
    
    await waitFor(() => {
      expect( backendApi.post ).toHaveBeenCalledWith(
        "/mod/request",
        {
          reason: "I want to help manage the community!",
          requestedId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );
      
      expect(mockOnRequestSubmitted).toHaveBeenCalled();
      expect(mockHandleCloseModal).toHaveBeenCalled();

    });
  });

  it("handles error when axios fails to submit", async () => {
    const mockError = new Error("Network Error");
    axios.post.mockRejectedValue(mockError);
    
    render(<BecomeMod onRequestSubmitted={mockOnRequestSubmitted} handleCloseModal={mockHandleCloseModal} />);
    
    const input = screen.getByPlaceholderText("Why would you like to become a mod?");
    fireEvent.change(input, { target: { value: "I want to contribute!" } });
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);

    expect(submitButton).toHaveTextContent("Submitting...");

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error submitting the request:", mockError);
      
    });
  });
});
