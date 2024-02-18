import detect from 'detect-port';
import { execSync } from 'child_process';
import pg from 'pg';
import { ENV } from '$lib/server/env';
import { supabaseAdmin } from '$lib/server/supabase-admin';
import type { Database } from '$lib/supabase-types';
import type { z } from 'zod';
import type { registerUserSchema } from '$lib/schemas.ts';

export async function startSupabase() {
	const port = await detect(54322);

	if (port !== 54322) {
		return;
	}
	execSync('pnpx supabase start');
}

export async function clearSupabaseData() {
	const client = new pg.Client({
		connectionString: ENV.SUPABASE_DB_URL
	});
	await client.connect();
	await client.query('TRUNCATE auth.users CASCADE');
}

type CreateUser = Omit<z.infer<typeof registerUserSchema>, 'password_confirm'>;

export async function createUser(user: CreateUser) {
	const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				full_name: user.full_name ?? 'Test User'
			}
		}
	});

	if (authError || !authData.user) {
		throw new Error('Error creating user');
	}
	return authData.user;
}
