import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export const alterResume = async (img: string, jobDescription: string) => {
  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a professional resume writer and designer. A user has uploaded their resume image and needs your help to rewrite it in HTML and style it appropriately and professionally and very modern and appealing. Note that the user will not be able to make any additional changes to this resume because it will be converted to a pdf and sent directly to the employer. Make sure the resume fits on One Single Page make use as much of the page as possible avoid white space and use the full width and height of the page. The user is applying for a job and this will be downloaded as a pdf and sent directly to the employer only one page will be sent so make sure you fit everything in the size of a pdf document.`,
        },

        {
          role: "user",
          content: [
            {
              type: "text",
              text: `I really need this job for my family and kids please help me get this job my family depends on it I need to look like the best candidate they will find. I will not be able to make any changes to the resume after you write it because its converted to a pdf and sent directly to the employer for this job. Please make this resume 10000x better. Here is the image of the resume you will completely rewrite in HTML so i can get this job. You will enhance every aspect, sentence, word-choice, elaberate, and add things that are not included but are necessary for getting certian things done that ive listed on my resume But do not lie because i can get in trouble if you write something I didnt actually do everything ive done is on this resume I have not left out any information you can assume these are the only things ive ever done, but it can be portrayed better and I could have worded things better and added more details. Ensure the new resume is more engaging, professional, and impactful. Tailor it perfectly to the job description highlighting things that can show i am a great fit. Make sure this fits on a 1 page pdf and do not lie. VERY IMPORTANT: DO NOT LIE OR MAKE ANYTHING UP, because this is going directly into a pdf document that I cannot edit to take any lies out I dont have enough money to buy pdf editors Job Description: ${jobDescription} now that you have seen the description remember i can not make changes to the resume you make so DO NOT LIE but make it 1000x better.
`,
            },
            {
              type: "image_url",
              image_url: {
                url: img,
              },
            },
          ],
        },
      ],
    });

    const alteredResumeHtml = chatResponse.choices[0].message.content?.trim();
    const htmlContentMatch = alteredResumeHtml?.match(/<html[\s\S]*<\/html>/);
    console.log("Resume altered successfully", alteredResumeHtml);

    console.log(chatResponse.usage?.total_tokens, "tokens used");
    return htmlContentMatch ? htmlContentMatch[0] : "";
  } catch (error) {
    console.error("Error generating new resume: ", error);
    throw error;
  }
};
