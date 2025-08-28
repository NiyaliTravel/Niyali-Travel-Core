import fs from 'fs';
import path from 'path';

export const logAgentAction = (action: string, agentId: string) => {
  const logPath = path.join(__dirname, '../../logs/agent.log');
  const entry = `[${new Date().toISOString()}] Agent ${agentId}: ${action}\n`;
  fs.appendFileSync(logPath, entry);
};