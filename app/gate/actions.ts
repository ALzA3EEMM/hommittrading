"use server"

export async function submitGateSignup(formData: { name: string; email: string; phone: string; password: string }) {
  // In a real application, you would:
  // 1. Hash the password
  // 2. Save to database
  // 3. Send email notification to admin

  // For now, we'll simulate sending the data to you
  console.log("New gate signup:", {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    password: formData.password, // In production, this should be hashed
    timestamp: new Date().toISOString(),
    source: "gate",
  })

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return { success: true }
}
