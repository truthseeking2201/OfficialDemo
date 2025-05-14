import { random } from "lodash";

// Mock API responses
export const getSample = async () => {
  await new Promise(resolve => setTimeout(resolve, random(300, 700)));
  return [];
};

export const getLatestWithdrawal = async (sender_address: string) => {
  await new Promise(resolve => setTimeout(resolve, random(300, 700)));
  
  // Load from localStorage if available
  try {
    const pendingWithdrawals = JSON.parse(localStorage.getItem('pendingWithdrawals') || '[]');
    const activeWithdrawal = pendingWithdrawals.find(w => w.senderAddress === sender_address);
    
    if (activeWithdrawal) {
      return {
        id: activeWithdrawal.id,
        status: "NEW",
        unlockTime: activeWithdrawal.unlockTime,
        amount: activeWithdrawal.amount
      };
    }
  } catch (e) {
    console.error("Error reading from localStorage", e);
  }
  
  return null;
};

export const executionWithdrawal = async (payload: any) => {
  await new Promise(resolve => setTimeout(resolve, random(500, 1000)));
  return { success: true, id: `withdraw-${Date.now()}` };
};

export const getVaultConfig = async (vault_address: string) => {
  await new Promise(resolve => setTimeout(resolve, random(300, 700)));
  
  // Return mock vault configuration
  return {
    apr: 15,
    total_users: 1247,
    total_liquidity: "50000000000" // 50,000 with proper decimals
  };
};
