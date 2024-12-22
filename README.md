# Expo Camera Preview Error: Accessing Camera Before Initialization

This repository demonstrates a common error encountered when using the Expo Camera API: attempting to access the camera preview before it's fully initialized.  This often results in unexpected behavior or app crashes.  The solution involves using asynchronous operations and checking the camera's readiness before interacting with it.

## Bug

The `bug.js` file showcases the problematic code. It attempts to access and manipulate the camera preview immediately after component mount, leading to an error.

## Solution

The `bugSolution.js` file demonstrates the corrected approach.  It leverages React's `useEffect` hook and a camera reference to ensure the camera is ready before any operations are performed on the preview.

## How to reproduce

1. Clone the repository.
2. Navigate to the repository directory.
3. Run `npm install`.
4. Run `expo start`.
5. Observe the behavior in `bug.js` (the error) and `bugSolution.js` (the solution).
