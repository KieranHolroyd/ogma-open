import type { License } from '../types.js';

export const LICENSES: License[] = [
	{
		licenseKey: 'OGMA-DEMO-2026',
		valid: true,
		product: 'Ogma Pro',
		expiresAt: '2027-01-01',
		seats: 5,
		activatedDevices: 2
	},
	{
		licenseKey: 'OGMA-TEAM-ENTERPRISE',
		valid: true,
		product: 'Ogma Enterprise',
		expiresAt: '2028-06-01',
		seats: 25,
		activatedDevices: 18
	},
	{
		licenseKey: 'OGMA-EXPIRED',
		valid: false,
		product: 'Ogma Pro',
		expiresAt: '2025-01-01',
		seats: 1,
		reason: 'License expired on 2025-01-01.'
	},
	{
		licenseKey: 'OGMA-REVOKED',
		valid: false,
		product: 'Ogma Pro',
		expiresAt: '2027-06-01',
		seats: 1,
		reason: 'License was revoked after a chargeback.'
	}
];

export function findLicense(licenseKey: string) {
	const normalized = licenseKey.trim().toUpperCase();
	return (
		LICENSES.find((license) => license.licenseKey.toUpperCase() === normalized) ?? null
	);
}
