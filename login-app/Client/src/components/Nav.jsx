import { useContext, useState } from 'react';
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();
	const { logout, token } = useContext(AuthContext);

	const showLoginButton = !['/login', '/signUp'].includes(location.pathname);

	return (
		<header className="bg-white">
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
			>
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img
							alt=""
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							className="h-8 w-auto"
						/>
					</a>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="h-6 w-6" />
					</button>
				</div>
				{showLoginButton && (
					<PopoverGroup className="hidden lg:flex lg:gap-x-12">
						<a
							href=""
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Home
						</a>
						<a
							href="#"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Dashboard
						</a>
						<a
							href="#"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Contact
						</a>
					</PopoverGroup>
				)}

				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					{token ? (
						<a
							onClick={logout}
							className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
						>
							Log out <span aria-hidden="true">&rarr;</span>
						</a>
					) : (
						<a
							href="/login"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							Log in <span aria-hidden="true">&rarr;</span>
						</a>
					)}
				</div>
			</nav>
			<Dialog
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
				className="lg:hidden"
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img
								alt=""
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								className="h-8 w-auto"
							/>
						</a>
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							{showLoginButton && (
								<div className="space-y-2 py-6">
									<a
										href=""
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Home
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Dashboard
									</a>
									<a
										href="#"
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Contact
									</a>
								</div>
							)}

							<div className="py-6">
								{token ? (
									<a
										onClick={logout}
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
									>
										Log out
									</a>
								) : (
									<a
										href="/login"
										className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										Log in
									</a>
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
};

export default Nav;
