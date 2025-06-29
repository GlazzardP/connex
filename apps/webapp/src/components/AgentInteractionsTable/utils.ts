import { Contacts200DataItem, Interactions200DataItem } from '../../lib/api';

export const addAgentNameToInteraction = () => {};

export const countUniqueAgentInteractions = (
  interactions: Interactions200DataItem[]
): Record<number, number> => {
  const agentCustomerSets: Record<number, Set<number>> = {};
  const uniqueCustomerCounts: Record<number, number> = {};

  interactions.forEach(({ agent_id, customer_id }) => {
    if (agent_id === undefined || customer_id === undefined) return;

    if (!agentCustomerSets[agent_id]) {
      agentCustomerSets[agent_id] = new Set([customer_id]);
      uniqueCustomerCounts[agent_id] = 1;
    } else {
      if (!agentCustomerSets[agent_id].has(customer_id)) {
        agentCustomerSets[agent_id].add(customer_id);
        uniqueCustomerCounts[agent_id] += 1;
      }
    }
  });

  return uniqueCustomerCounts;
};

const SECONDS_IN_AN_HOUR = 3600;
export const formatTime = (seconds: number) =>
  (seconds / SECONDS_IN_AN_HOUR).toFixed(2);

export const getCustomersAgentHasContacted = (
  interactions: Interactions200DataItem[],
  customers: Contacts200DataItem[]
): Record<number, string[]> => {
  const agentCustomers: Record<number, string[]> = {};
  interactions.forEach((interaction) => {
    const agentId = interaction.agent_id;
    const customerId = interaction.customer_id;

    if (!agentId || !customerId) return;

    const customer = customers.find((c) => c.id === customerId);
    const customerName = customer ? customer.name! : 'Unknown';

    if (!agentCustomers[agentId]) {
      agentCustomers[agentId] = [];
    }

    if (!agentCustomers[agentId].includes(customerName)) {
      agentCustomers[agentId].push(customerName);
    }
  });

  return agentCustomers;
};
