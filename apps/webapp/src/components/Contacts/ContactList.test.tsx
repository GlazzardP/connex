// import { render, screen, fireEvent } from '@testing-library/react';
// import { ContactsList } from '.';
// import * as api from '../../lib/api';
// import { vi } from 'vitest';

// vi.mock('../../lib/api/agents', () => ({
//   useAgents: vi.fn(),
// }));

// const mockUseAgents = vi.mocked(api.useAgents);

// describe('ContactsList', () => {
//   it('shows empty message when no contacts', () => {
//     mockUseAgents.mockReturnValue({
//       data: { data: { data: [] } },
//       isLoading: false,
//       error: null,
//     });

//     render(<ContactsList />);
//     expect(screen.getByText(/no contacts found/i)).toBeInTheDocument();
//   });

//   it('filters contacts by search', () => {
//     mockUseAgents.mockReturnValue({
//       data: {
//         data: {
//           data: [
//             { id: '1', name: 'Alice' },
//             { id: '2', name: 'Bob' },
//           ],
//         },
//       },
//       isLoading: false,
//       error: null,
//     });

//     render(<ContactsList />);
//     const input = screen.getByLabelText(/search/i);
//     fireEvent.change(input, { target: { value: 'Alice' } });

//     expect(screen.getByText('Alice')).toBeInTheDocument();
//     expect(screen.queryByText('Bob')).not.toBeInTheDocument();
//   });
// });
