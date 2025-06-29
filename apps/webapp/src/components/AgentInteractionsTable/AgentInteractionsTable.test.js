import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AgentInteractionsTable from './AgentInteractionsTable';
import '@testing-library/jest-dom';

jest.mock('../../lib/api', () => ({
  useInteractions: jest.fn(),
  useAgents: jest.fn(),
  useContacts: jest.fn(),
}));

import { useInteractions, useAgents, useContacts } from '../../lib/api';

describe('AgentInteractionsTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state', () => {
    useInteractions.mockReturnValue({ data: undefined });
    useAgents.mockReturnValue({ data: undefined, isLoading: true });
    useContacts.mockReturnValue({ data: undefined });

    render(<AgentInteractionsTable />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    useInteractions.mockReturnValue({ data: undefined });
    useAgents.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    });
    useContacts.mockReturnValue({ data: undefined });

    render(<AgentInteractionsTable />);
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  test('renders data rows correctly', async () => {
    const interactionsData = {
      data: {
        data: [
          {
            id: 101,
            agent_id: 1,
            customer_id: 10,
            length_seconds: 300,
            created_at: '2025-06-25T10:30:00Z',
          },
          {
            id: 102,
            agent_id: 1,
            customer_id: 20,
            length_seconds: 180,
            created_at: '2025-06-25T11:00:00Z',
          },
          {
            id: 103,
            agent_id: 2,
            customer_id: 10,
            length_seconds: 120,
            created_at: '2025-06-25T12:00:00Z',
          },
        ],
      },
    };

    const agentsData = {
      data: {
        data: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ],
      },
      isLoading: false,
      error: false,
    };

    const contactsData = {
      data: {
        data: [
          { id: 10, name: 'Customer A' },
          { id: 20, name: 'Customer B' },
        ],
      },
    };

    useInteractions.mockReturnValue({ data: interactionsData });
    useAgents.mockReturnValue(agentsData);
    useContacts.mockReturnValue(contactsData);

    render(<AgentInteractionsTable />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Customer A')).toBeInTheDocument();
      expect(screen.getByText('Customer B')).toBeInTheDocument();
      expect(screen.getByText('2025-06-25T10:30:00Z')).toBeInTheDocument();
    });
  });
});
