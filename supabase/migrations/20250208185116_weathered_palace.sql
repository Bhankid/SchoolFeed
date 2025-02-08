/*
  # Initial Schema for School Feeding Fee Management

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `class` (text)
      - `payment_type` (enum: 'regular', 'occasional', 'credit')
      - `balance` (decimal)
      - `advance_payment` (decimal)
      - `created_at` (timestamp)
    
    - `attendance`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `date` (date)
      - `present` (boolean)
      - `created_at` (timestamp)
    
    - `payments`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `amount` (decimal)
      - `payment_date` (date)
      - `type` (enum: 'advance', 'regular', 'credit_payment')
      - `created_at` (timestamp)
    
    - `daily_meals`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `date` (date)
      - `status` (enum: 'paid', 'unpaid', 'credit')
      - `amount` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enum types
CREATE TYPE payment_type AS ENUM ('regular', 'occasional', 'credit');
CREATE TYPE payment_status AS ENUM ('paid', 'unpaid', 'credit');
CREATE TYPE meal_payment_type AS ENUM ('advance', 'regular', 'credit_payment');

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  class text NOT NULL,
  payment_type payment_type NOT NULL DEFAULT 'regular',
  balance decimal DEFAULT 0,
  advance_payment decimal DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  date date NOT NULL,
  present boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, date)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  amount decimal NOT NULL,
  payment_date date NOT NULL,
  type meal_payment_type NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create daily_meals table
CREATE TABLE IF NOT EXISTS daily_meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  date date NOT NULL,
  status payment_status NOT NULL DEFAULT 'unpaid',
  amount decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, date)
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_meals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations for authenticated users" ON students
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for authenticated users" ON attendance
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for authenticated users" ON payments
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for authenticated users" ON daily_meals
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to check weekday
CREATE OR REPLACE FUNCTION is_weekday(check_date date)
RETURNS boolean AS $$
BEGIN
  RETURN EXTRACT(DOW FROM check_date) BETWEEN 1 AND 5;
END;
$$ LANGUAGE plpgsql;