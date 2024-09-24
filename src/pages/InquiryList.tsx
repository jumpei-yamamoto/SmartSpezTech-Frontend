import React, { useState, useEffect } from "react";
import axios from "axios"; // 追加
import { Link } from "react-router-dom"; // 追加
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pagenation from "../components/Pagenation";
import FilterSidebar from "../components/FilterSidebar";
import JobFilter from "../components/JobFilter";

// 問い合わせデータの型定義
interface Inquiry {
  id: number;
  name: string;
  email: string;
  inquiry: string;
  status: number;
}

const InquiryList: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highestRate' | 'lowestRate'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:80"; // 追加

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Inquiry[]>(`${apiBaseUrl}/api/inquiries`, {
          withCredentials: false,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [apiBaseUrl]);

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "進行中";
      case 1:
        return "受注済み";
      case 2:
        return "キャンセル済み";
      default:
        return "不明";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-blue-100 text-blue-800";
      case 1:
        return "bg-green-100 text-green-800";
      case 2:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFilteredAndSortedInquiries = () => {
    let filteredInquiries = [...inquiries];

    switch (sortOrder) {
      case 'newest':
        filteredInquiries.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        filteredInquiries.sort((a, b) => a.id - b.id);
        break;
      // 他のソートオプションは必要に応じて実装
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredInquiries.slice(startIndex, endIndex);
  };

  const filteredInquiries = getFilteredAndSortedInquiries();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <FilterSidebar />
          </aside>

          {/* Inquiry Listings */}
          <section className="md:col-span-3">
            <JobFilter
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              totalJobs={inquiries.length}
              currentPage={currentPage}
            />
            {loading ? (
              <p>Loading...</p>
            ) : (
              filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="bg-white p-6 rounded-lg shadow-lg flex mb-6"
                >
                  <div className="ml-6 flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-bold text-xl mb-1">
                          問い合わせ番号:{" "}
                          <Link
                            to={`/inquirydetail/${inquiry.id}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {inquiry.id}
                          </Link>
                        </h3>
                        <p className="text-gray-500">{inquiry.name}</p>
                        <p className="text-gray-500">{inquiry.email}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          inquiry.status
                        )}`}
                      >
                        {getStatusText(inquiry.status)}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{inquiry.inquiry}</p>
                  </div>
                </div>
              ))
            )}

            <div className="flex justify-center mt-8">
              <Pagenation
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(inquiries.length / itemsPerPage)}
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InquiryList;
