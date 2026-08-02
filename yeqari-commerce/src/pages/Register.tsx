import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {step === 1 ? 'Create your account' : 'Welcome to Yeqari Commerce'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {step === 1 ? (
            <>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">
                Sign in
              </Link>
            </>
          ) : (
            'Let\'s set up your business.'
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Owner Name</label>
                <div className="mt-1">
                  <input type="text" required className="input-field" placeholder="John Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email address</label>
                <div className="mt-1">
                  <input type="email" required className="input-field" placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="mt-1">
                  <input type="password" required className="input-field" />
                </div>
              </div>

              <div>
                <button type="submit" className="w-full btn-primary py-2.5 flex justify-center">
                  Create Account
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleOnboarding}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Business Name</label>
                <div className="mt-1">
                  <input type="text" required className="input-field" placeholder="My Fashion Store" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Business Category</label>
                <div className="mt-1">
                  <select className="input-field">
                    <option>Fashion</option>
                    <option>Home Decor</option>
                    <option>Bakery</option>
                    <option>Jewellery</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">WhatsApp Number</label>
                <div className="mt-1">
                  <input type="tel" required className="input-field" placeholder="+94 77 123 4567" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Currency</label>
                <div className="mt-1">
                  <select className="input-field">
                    <option>LKR (Rs.)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full btn-primary py-2.5 flex justify-center text-lg shadow-sm">
                  Continue
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
