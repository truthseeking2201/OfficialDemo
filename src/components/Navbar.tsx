import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  useCurrentAccount,
  useDisconnectWallet,
  useSuiClientQuery,
  useConnectWallet,
  useAccounts,
  useWallets,
} from "@mysten/dapp-kit";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: connect } = useConnectWallet();
  const accounts = useAccounts();
  const wallets = useWallets();
  const { data: balance } = useSuiClientQuery("getBalance", {
    owner: account?.address || "",
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string) => {
    return (Number(balance) / 1e9).toFixed(2);
  };

  const handleCopyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
    }
  };

  const handleSwitchAccount = (accountToSwitch: (typeof accounts)[0]) => {
    if (wallets[0]) {
      connect({ wallet: wallets[0], accountAddress: accountToSwitch.address });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <nav
        className={cn(
          "px-6 md:px-12 backdrop-blur-md border-b transition-all duration-300",
          scrolled
            ? "bg-nodo-darker/90 border-white/10 shadow-lg"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-xl font-bold tracking-tight text-white group-hover:opacity-80 transition-opacity">
              NODO
              <span className="text-nova ml-0.5 relative">
                AI
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-nova/80 to-nova group-hover:w-full transition-all duration-300"></span>
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/vaults"
              className={cn(
                "text-sm transition-all duration-200 hover:text-nova relative group",
                isActive("/vaults") ? "text-nova" : "text-white/70"
              )}
            >
              <span>Vaults</span>
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-nova transition-all duration-300",
                  isActive("/vaults") ? "w-full" : "w-0 group-hover:w-full"
                )}
              ></span>
            </Link>
            <a
              href="https://docs.nodoai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/70 transition-all duration-200 hover:text-nova relative group"
            >
              <span>Docs</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nova group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Desktop Wallet & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {account && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-nova/10 hover:bg-nova/20 text-white flex items-center gap-2 border border-nova/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{formatAddress(account.address)}</span>
                      {balance && (
                        <span className="text-nova font-medium">
                          {formatBalance(balance.totalBalance)} SUI
                        </span>
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-nodo-darker border border-white/10">
                  <DropdownMenuLabel className="text-white/70">
                    Connected Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {accounts.map((acc) => (
                    <DropdownMenuItem
                      key={acc.address}
                      className={cn(
                        "text-white hover:bg-white/10 cursor-pointer flex items-center gap-2 py-3",
                        acc.address === account.address && "bg-white/5"
                      )}
                      onClick={() => handleSwitchAccount(acc)}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {formatAddress(acc.address)}
                        </span>
                        <span className="text-xs text-white/50">
                          acc {accounts.indexOf(acc) + 1}
                        </span>
                      </div>
                      {acc.address === account.address && (
                        <span className="ml-auto text-xs text-white/50">
                          Connected
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white hover:bg-white/10 cursor-pointer flex items-center gap-2"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="w-4 h-4" /> Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white hover:bg-white/10 cursor-pointer flex items-center gap-2"
                    onClick={() => disconnect()}
                  >
                    <X className="w-4 h-4" /> Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button
              className="btn-gradient-nova text-white shadow-lg shadow-nova/20 relative overflow-hidden group"
              asChild
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                <span>Launch App</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="text-white p-2 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative h-6 w-6 transform transition-all duration-300">
                {isMenuOpen ? (
                  <X
                    size={24}
                    className="absolute transform transition-all duration-300 rotate-90 opacity-0 animate-in"
                    onAnimationEnd={(e) => {
                      e.currentTarget.classList.remove(
                        "rotate-90",
                        "opacity-0"
                      );
                    }}
                  />
                ) : (
                  <Menu
                    size={24}
                    className="absolute transform transition-all duration-300"
                  />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-nodo-darker/95 backdrop-blur-lg p-6 lg:hidden z-40 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-6">
            <Link
              to="/vaults"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-nova"></div>
              <span>Vaults</span>
            </Link>
            <a
              href="https://docs.nodoai.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 text-lg text-white hover:text-nova transition-colors duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-nova"></div>
              <span>Docs</span>
            </a>
            {account && (
              <div className="pt-4">
                <div className="bg-nova/10 border border-nova/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-white">
                        {formatAddress(account.address)}
                      </span>
                    </div>
                    {balance && (
                      <div className="text-nova font-medium">
                        {formatBalance(balance.totalBalance)} SUI
                      </div>
                    )}
                  </div>

                  {accounts.length > 1 && (
                    <div className="mb-4">
                      <div className="text-sm text-white/50 mb-2">
                        Switch Account
                      </div>
                      <div className="space-y-2">
                        {accounts.map((acc) => (
                          <Button
                            key={acc.address}
                            variant="outline"
                            className={cn(
                              "w-full bg-transparent border-white/20 text-white flex items-center justify-between",
                              acc.address === account.address && "bg-white/5"
                            )}
                            onClick={() => handleSwitchAccount(acc)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>acc {accounts.indexOf(acc) + 1}</span>
                            </div>
                            <span className="text-xs text-white/50">
                              {formatAddress(acc.address)}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent border-white/20 text-white"
                      onClick={handleCopyAddress}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent border-white/20 text-white"
                      onClick={() => disconnect()}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="pt-6">
              <Button className="w-full btn-gradient-nova text-white" asChild>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2"
                >
                  Launch App
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
