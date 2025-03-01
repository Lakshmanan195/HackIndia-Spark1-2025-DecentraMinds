"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { auth } from "./firebase"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
  Alert,
  AlertDescription,
  Switch,
} from "./components/ui"
import {
  Upload,
  Wallet,
  FileText,
  Tag,
  Loader2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Moon,
  LogOut,
} from "lucide-react"
import Auth from "./components/Auth"

function App() {
  const [user, setUser] = useState(null)
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [userAddress, setUserAddress] = useState("")
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")
  const [fileName, setFileName] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true"
    }
    return false
  })
  const [uploadResult, setUploadResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [errorType, setErrorType] = useState("") // "server", "blockchain", "validation"

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    }
  }, [isDarkMode])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    setErrorMessage("")
    setErrorType("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("tags", tags)
    formData.append("userAddress", userAddress)

    try {
      const response = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setUploadResult(response.data)
      setActiveTab("results")
    } catch (error) {
      console.error("Error uploading content:", error)

      if (error.response) {
        const { data } = error.response
        if (data.message.includes("Insufficient funds")) {
          setErrorType("blockchain")
          setErrorMessage(
            "Insufficient funds to complete the transaction. Please add funds to your wallet and try again.",
          )
        } else if (data.message.includes("Fake content detected")) {
          setErrorType("validation")
          setErrorMessage("This content has been detected as potentially fake. NFT minting is not allowed.")
        } else {
          setErrorType("server")
          setErrorMessage(data.message || "There was an issue processing your request. Please try again later.")
        }
      } else {
        setErrorType("server")
        setErrorMessage("Unable to connect to the server. Please check your internet connection and try again.")
      }
    } finally {
      setIsUploading(false)
    }
  }

  const renderTagBadges = () => {
    if (!tags) return null
    return tags.split(",").map((tag, index) => (
      <Badge key={index} variant="secondary" className="mr-1">
        {tag.trim()}
      </Badge>
    ))
  }

  const handleLogout = () => {
    auth.signOut()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Web3 Content Platform</CardTitle>
            <CardDescription>Sign in to upload content and earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Auth />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-white dark:bg-purple-900 text-purple-700 dark:text-purple-300 ${isDarkMode ? "dark" : ""}`}
    >
      <div className="w-full max-w-4xl mx-auto p-4">
        <header className="flex justify-between items-center mb-8 bg-purple-100 dark:bg-purple-800 p-4 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-200">Web3 Content Platform</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-purple-700 p-2 rounded-full shadow-inner">
              <Sun className="h-4 w-4 text-yellow-500" />
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} aria-label="Toggle dark mode" />
              <Moon className="h-4 w-4 text-purple-500" />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-white dark:bg-purple-700 text-purple-700 dark:text-purple-200 border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {errorMessage && (
          <Alert
            variant={errorType === "blockchain" ? "warning" : errorType === "validation" ? "error" : "destructive"}
            className="mb-6"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage}
              {errorType === "blockchain" && (
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-yellow-700 dark:text-yellow-400 underline ml-2"
                  onClick={() => window.open("https://sepoliafaucet.com", "_blank")}
                >
                  Get test ETH
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload Content</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-purple-500" />
                  Upload Content
                </CardTitle>
                <CardDescription>Upload your content to IPFS, mint an NFT, and earn tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="file" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-500" /> File
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input id="file" type="file" onChange={handleFileChange} className="hidden" required />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file").click()}
                        className="w-full h-32 border-dashed border-2 border-purple-300 dark:border-purple-600 flex flex-col items-center justify-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors rounded-lg"
                      >
                        <Upload className="h-8 w-8 text-purple-500" />
                        {fileName ? (
                          <span className="text-sm text-center break-all text-purple-700 dark:text-purple-300">
                            {fileName}
                          </span>
                        ) : (
                          <span className="text-sm text-center text-purple-500">Click or drag to upload a file</span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-500" /> Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a title for your content"
                      className="bg-white dark:bg-purple-900 border-purple-300 dark:border-purple-600 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-500" /> Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your content"
                      rows={3}
                      className="bg-white dark:bg-purple-900 border-purple-300 dark:border-purple-600 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-purple-500" /> Tags
                    </Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Enter tags (comma-separated)"
                      className="bg-white dark:bg-purple-900 border-purple-300 dark:border-purple-600 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">{renderTagBadges()}</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallet" className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-purple-500" /> Wallet Address
                    </Label>
                    <Input
                      id="wallet"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      placeholder="Enter your wallet address"
                      required
                      className="bg-white dark:bg-purple-900 border-purple-300 dark:border-purple-600 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                    disabled={isUploading || !file || !userAddress}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Upload & Mint</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Upload Result
                </CardTitle>
                <CardDescription>Your content upload and NFT minting status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {uploadResult ? (
                  <>
                    <div className="rounded-lg border border-purple-200 dark:border-purple-700 p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        <FileText className="h-4 w-4 text-purple-500" /> IPFS Content
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-600 dark:text-purple-400">Content uploaded to IPFS</span>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-purple-500 border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-800"
                        >
                          <a
                            href={`https://ipfs.io/ipfs/${uploadResult.ipfsHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            View on IPFS <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-purple-200 dark:border-purple-700 p-4">
                      <h3 className="font-medium mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        <FileText className="h-4 w-4 text-purple-500" /> Upload Details
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          <strong>File:</strong> {uploadResult.file}
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          <strong>Title:</strong> {uploadResult.title}
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          <strong>Description:</strong> {uploadResult.description}
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          <strong>Tags:</strong> {uploadResult.tags}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-purple-600 dark:text-purple-400">
                      No upload results to display. Please upload a file first.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full text-purple-500 border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-800"
                  onClick={() => setActiveTab("upload")}
                >
                  Upload Another File
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App
