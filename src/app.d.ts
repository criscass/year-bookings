import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase-types.ts';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}

interface BorderColor {
	primary: string;
	primaryToken: string;
	secondary: string;
	secondaryToken: string;
	tertiary: string;
	success: string;
	warning: string;
	error: string;
	surface: string;
}

export {};
