'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function SignupPage() {
  const [form, setForm] = useState({  email: '', password: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();




    // 🔹 Auto Login
    const loginRes = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (loginRes?.ok) {
      router.push('/dashboard');
    } else {
      MySwal.fire({
        title: 'Login Failed',
        text: loginRes?.error || 'Login error, please try manually.',
        icon: 'error',
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your finmate Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <Link href="/auth/signup">signup</Link>
        </form>
      </div>
    </main>
  );
}
