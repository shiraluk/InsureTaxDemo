# Insurance Tax Quote System Requirements

## User Paths

### Path A: Upload Now
- **Description**: Users upload documents during the session to get immediate final pricing
- **States**:
  1. Initial Quote (0/2 documents)
     - Show preliminary price
     - Prompt for document upload
  2. Partial Upload (1/2 documents)
     - Maintain initial price display
     - Show progress indicator
     - Encourage completion
  3. Final Quote (2/2 documents)
     - Display final price
     - Enable purchase options
  4. Purchase Complete

### Path B: Upload Later
- **Description**: Users authorize payment now and submit documents later
- **States**:
  1. Initial Quote
  2. Terms & Consent Review
  3. Card Authorization
  4. Purchase Complete (Pending Documents)

## Document Requirements
- **Required Tax Returns**: 
  - 2022 Tax Return
  - 2023 Tax Return
- **File Specifications**:
  - Maximum size: 10MB per file
  - Accepted formats: PDF, JPG, JPEG, PNG
- **Security**:
  - Documents are encrypted
  - Industry-standard security measures
  - Secure transmission protocols

## Legal Requirements

### Coverage Terms
Coverage under the proposed policy is NOT effective until and unless:
1. A completed and filed tax return has been provided
2. Written notification of completed underwriting is received
3. Payment has been received
4. Policy has been issued
5. Policy effective date has been confirmed in writing

Quote validity based on April 10, 2025 terms.

## User Experience Requirements

### General UX Considerations
1. Multi-day process support
2. CPA consultation accommodation
3. Document gathering time allowance
4. Clear state indicators
5. Save and resume functionality
6. Email notifications for follow-up
7. Clear security messaging

### UI Components
1. Status Indicator
   - Current state display
   - Document upload progress
   - Next steps indication
   - Estimated completion time

2. Document Upload Interface
   - Progress indicators
   - "Save & Continue Later" option
   - Email notifications
   - Clear file type display
   - Drag-and-drop zone
   - Visual feedback

3. Quote Management
   - "Save Quote" functionality
   - "Share with CPA" option
   - Quote expiration timer
   - Email session resume links

4. Price Display
   - State-specific labels:
     - "Estimated Price"
     - "Price pending final document"
     - "Final Price - Valid for X days"

5. Action Buttons
   - Context-aware primary/secondary actions
   - State-specific labels:
     - "Upload Documents"
     - "Complete Upload"
     - "Purchase Now"

## Technical Implementation Notes
- Built with Vite + React
- Development server runs on port 3001
- Material-UI components for consistent design
- State management for multi-step process
- Real-time validation and feedback 