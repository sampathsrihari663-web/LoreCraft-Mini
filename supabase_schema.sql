-- ============================================================================
-- LORECRAFT: SUPABASE CAMPAIGN DATABASE SCHEMA
-- ============================================================================
-- Execute this script in your Supabase project's SQL Editor:
-- (Supabase Dashboard -> SQL Editor -> New Query -> Paste & Run)
--
-- This script configures:
-- 1. Topics Table (Stores the 92 campaign syllabus chambers across 6 worlds)
-- 2. Fast indexes for world, tier, and progression querying
-- 3. Row Level Security (RLS) policies allowing the client to read and update
--    chamber statuses and completions without authentication barriers.
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. TOPICS TABLE (The Campaign Syllabus)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  world TEXT NOT NULL,                  -- 'python', 'csharp', 'cpp', 'html', 'css', 'javascript'
  tier INT NOT NULL,                    -- 1: Foundations, 2: Core, 3: Advanced
  tier_name TEXT NOT NULL,              -- 'Foundations', 'Core', 'Advanced'
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'locked',-- 'unlocked', 'locked', 'completed'
  boss_question TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for instant realm & progression lookups
CREATE INDEX IF NOT EXISTS idx_topics_world_tier ON public.topics(world, tier, order_index);
CREATE INDEX IF NOT EXISTS idx_topics_status ON public.topics(world, status);

-- ============================================================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

-- Allow read access for everyone
DROP POLICY IF EXISTS "Allow public read access on topics" ON public.topics;
CREATE POLICY "Allow public read access on topics"
  ON public.topics
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow updating topic progression (unlocking and completion)
DROP POLICY IF EXISTS "Allow public update access on topics" ON public.topics;
CREATE POLICY "Allow public update access on topics"
  ON public.topics
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow inserting syllabus topics (for seeding)
DROP POLICY IF EXISTS "Allow insert on topics" ON public.topics;
CREATE POLICY "Allow insert on topics"
  ON public.topics
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ============================================================================
-- Schema installation complete!
-- Next step: Run `supabase_seed.sql` in the SQL Editor to populate all 92 chambers.
-- ============================================================================
